/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Message from "../components/message";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  //Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Host Your Mind - Compartilhe e explore suas ideias e dicas importantes</title>
        <meta name="description" content="Compartilhe e explore suas ideias e dicas importantes, bom, se divirta." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 font-medium text-base ">
        <h2 className="font-bold text-lg">Veja o que tá rolando por aqui 👀👇</h2>
        <br/>
        {allPosts.map((post) => (
          <Message key={post.id} {...post} >
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }} >
              <button className="indent-7 text-sm text-gray-500">
                {post.comments?.length > 0 ? post.comments?.length : 0} comentários
              </button>
            </Link>
          </Message>
        ))}
        <br />
        <p className="text-sm text-center">
          Clique em <strong>&quot;Solicitar acesso&quot;</strong> para compartilhar suas ideias conosco.
        </p>
      </div>
      <div className="border-2 bg-transparent p-4 rounded-md shadow text-base font-object">
        <p>
          <strong>Sejam bem-vindos(as)</strong><br /><br />

          Essa ferramenta simples e ágil, fará toda a diferença para que você alcance um alto nível de credibilidade no mercado.<br /><br />

          Desfrutem de forma GRATUITA.<br /><br />

          Nos siga nas redes sociais: <br/>
          <a className="font-bold" href="https://www.dotspaced.com/links" target="_blank">@spacedsoft</a>
          <br/>
          <a className="font-bold" href="https://www.dotspaced.com/henry" target="_blank">@henrymartinsb</a>

          <br /><br />
        </p>
      </div>
      <br />
      <footer>
        <p className="text-sm text-center">© 2023 by <a className="font-extrabold font-[Object Sans] italic text-spaced" href="https://dotspaced.com" target="_blank">Spaced</a> - All rights reserved.</p>
      </footer>
    </div>
  );
}