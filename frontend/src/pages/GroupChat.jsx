import { useEffect, useState } from "react";
import socket from "../socket";
import API from "../api/axios";

const GroupChat = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user?._id;

  // 📥 fetch groups
  const fetchGroups = async () => {
    const res = await API.get("/groups");
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();

    socket.on("receiveGroupMessage", (data) => {
      if (data.groupId === selectedGroup?._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveGroupMessage");
  }, [selectedGroup]);

  // join group
  const joinGroup = (group) => {
    setSelectedGroup(group);
    socket.emit("joinGroup", group._id);
    setMessages([]); // reset
  };

  // send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    const msg = {
      groupId: selectedGroup._id,
      senderId,
      message: text,
    };

    // save in DB
    await API.post("/messages", msg);

    // socket emit
    socket.emit("sendGroupMessage", msg);

    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Groups */}
      <div style={{ width: "30%" }}>
        <h3>Groups</h3>
        {groups.map((g) => (
          <div key={g._id} onClick={() => joinGroup(g)}>
            {g.name}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div style={{ width: "70%" }}>
        {selectedGroup ? (
          <>
            <h3>{selectedGroup.name}</h3>

            {messages.map((m, i) => (
              <p key={i}>
                <b>{m.senderId === senderId ? "You" : m.senderId}</b>:{" "}
                {m.message}
              </p>
            ))}

            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </>
        ) : (
          <h3>Select Group</h3>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
