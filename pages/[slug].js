/* eslint-disable react-hooks/exhaustive-deps */
import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) { console.log(auth.currentUser);
      toast.error('Ih, você não tá cadastrado, clique em "Solicitar acesso" 😅', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
    });
      return;
    }
    if (!message) {
      console.log(message);
      toast.error("Comentário vazio não dá pô 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Enviar comentário 😀"
            className="bg-gray-800 w-full p-2 text-white text-sm rounded-l"
          />
          <button
            onClick={submitMessage}
            className="bg-green-700 text-white py-2 px-4 text-sm rounded-r"
          >
            Enviar
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comentários</h2>
          {allMessage?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white text-xs font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full p-1">🐧</span>
                <h2 className="font-extrabold text-lg font-object">
                  {message.userName}:
                </h2>
              </div>
              <h2 className="text-sm indent-7">{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}