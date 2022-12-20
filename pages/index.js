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

      <div className="my-12 text-lg font-medium">
        <h2>Veja o que tá rolando por aqui 👀</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button>
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
            </Link>
          </Message>
        ))}
        <br />
        <p className="text-sm text-center">
          Clique em <strong>"Solicitar acesso"</strong> para compartilhar suas ideias conosco.
        </p>
      </div>
      <div className="border-2 bg-transparent p-2 rounded-md shadow">
        <p>
          <strong>Sejam bem-vindos(as)</strong><br /><br />

          Essa ferramenta simples e ágil, fará toda a diferença para que você alcance um alto nível de credibilidade no mercado.<br /><br />

          Desfrutem de forma GRATUITA.<br /><br />

          Nos siga nas redes sociais: <br/>
          <a className="font-bold font-sans" href="https://www.dotspaced.com/links">@spacedsoft</a>
          <br/>
          <a className="font-bold font-sans" href="https://www.dotspaced.com/henry">@henrymartinsb</a>

          <br /><br />
        </p>
      </div>
      <br />
      <footer>
        <p className="text-sm text-center">© 2023 by <a className="font-bold font-object italic text-spaced" href="https://dotspaced.com">Spaced</a> - All rights reserved.</p>
      </footer>
    </div>
  );
}