import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Send } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { auth, db } from "@/firebase";
import {
addDoc,
collection,
doc,
onSnapshot,
orderBy,
query,
serverTimestamp,
setDoc,
updateDoc,
where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const user = auth.currentUser;
  useEffect(() => {
  if (!user) return;

  const setOnline = async () => {
    await setDoc(
      doc(db, "presence", user.uid),
      {
        online: true,
        lastSeen: serverTimestamp(),
        email: user.email,
      },
      { merge: true }
    );
  };

  setOnline();

  const handleOffline = async () => {
    await setDoc(
      doc(db, "presence", user.uid),
      {
        online: false,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
  };

  window.addEventListener("beforeunload", handleOffline);

  return () => {
    handleOffline();
    window.removeEventListener(
      "beforeunload",
      handleOffline
    );
  };
}, [user]);

  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>(
    localStorage.getItem("activeChatId") || ""
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [presenceMap, setPresenceMap] =
  useState<any>({});
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats(data);

      if (!activeChatId && data.length > 0) {
        setActiveChatId(data[0].id);
        localStorage.setItem("activeChatId", data[0].id);
      }
    });

    return () => unsub();
  }, [user]);
  useEffect(() => {
  if (!activeChatId) return;

  const unsub = onSnapshot(
    doc(db, "chats", activeChatId),
    
    (snapshot) => {
      const data = snapshot.data();

      if (!data) return;

      if (data.typingUser !== user?.uid) {
        setTypingUser(data.typingUser || "");
      }
    }
  );

  return () => unsub();
}, [activeChatId]);
useEffect(() => {
  const unsub = onSnapshot(
    collection(db, "presence"),
    (snapshot) => {
      const data: any = {};

      snapshot.docs.forEach((docItem) => {
        data[docItem.id] = docItem.data();
      });

      setPresenceMap(data);
    }
  );

  return () => unsub();
}, []);

  useEffect(() => {
    if (!activeChatId) return;

    const q = query(
      collection(db, "chats", activeChatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    });

    return () => unsub();
  }, [activeChatId]);

  const openChat = (id: string) => {
    setActiveChatId(id);
    localStorage.setItem("activeChatId", id);
  };
const handleTyping = async (
  value: string
) => {
  setText(value);

  if (!activeChatId || !user) return;

  await setDoc(
    doc(db, "chats", activeChatId),
    {
      typingUser: value.trim()
        ? user.uid
        : "",
    },
    { merge: true }
  );
};
  const sendMessage = async () => {
    if (!text.trim()) return;
    if (!user || !activeChatId) return;

    await addDoc(collection(db, "chats", activeChatId, "messages"), {
      text,
      senderId: user.uid,
      senderEmail: user.email,
      createdAt: serverTimestamp(),
    });
    await updateDoc(
  doc(db, "chats", activeChatId),
  {
    typingUser: "",
    lastMessage: text,
  }
);

    setText("");
  };

  if (!user) {
    return (
      <SiteShell>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold">Please login to view messages</h1>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl border bg-card overflow-hidden shadow-sm grid md:grid-cols-[320px_1fr] min-h-[600px]">
          <aside className="border-r bg-muted/20">
            <div className="px-5 py-4 border-b">
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-sm text-muted-foreground">Your conversations</p>
            </div>

            <div className="divide-y">
              {chats.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground text-center">
                  No conversations yet
                </div>
              ) : (
                chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => openChat(chat.id)}
                    className={`w-full text-left p-4 hover:bg-background transition-colors ${
                      activeChatId === chat.id ? "bg-background" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={chat.listingImage}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-muted"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm line-clamp-1">
                          {chat.listingTitle}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
  {chat.lastMessage || "Start chatting"}
</div>

<p
  className={`text-[11px] font-medium mt-1 ${
    presenceMap[
      chat.participants?.find(
        (p: string) => p !== user?.uid
      )
    ]?.online
      ? "text-emerald-500"
      : "text-muted-foreground"
  }`}
>
  {presenceMap[
    chat.participants?.find(
      (p: string) => p !== user?.uid
    )
  ]?.online
    ? "● Online"
    : "● Offline"}
</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          <main className="flex flex-col">
            <div className="border-b px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold">Real-time campus chat</h2>
                <p className="text-xs text-muted-foreground">
                  Buyer and seller conversation
                </p>
              </div>
            </div>
            {typingUser && (
  <div className="px-6 py-2 text-sm text-muted-foreground border-b">
    Someone is typing...
  </div>
)}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
              {!activeChatId ? (
                <div className="text-center text-muted-foreground mt-32">
                  Select a conversation
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-32">
                  No messages yet
                </div>
              ) : (
                messages.map((msg) => {
                  const mine = msg.senderId === user.uid;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow ${
                          mine
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t p-4 flex gap-3">
              <input
                value={text}
                onChange={(e) =>
  handleTyping(e.target.value)
}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type a message..."
                className="flex-1 h-12 rounded-2xl border bg-background px-4 outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!activeChatId}
                className="h-12 w-12 rounded-2xl gradient-primary text-primary-foreground grid place-items-center disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </SiteShell>
  );
}