// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, totalCount }) {
  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧：{totalCount}件
      </h1>
      <div>
        <ul className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {blog.map((blog) => (
            <li key={blog.id} className="rounded overflow-hidden shadow-lg">
              <Link href={`/blog/${blog.id}`}>
                <a>
                  <img src={blog.image.url} alt={blog.image.name} />
                  <div>
                    <h2 className="px-6 pt-4">{blog.title}</h2>
                    <div className="px-6 pb-2">{blog.createdAt}</div>
                    <div className="px-6 pb-4">
                      <span># {blog.tag}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data);
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
