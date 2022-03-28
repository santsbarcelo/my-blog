// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, totalCount }) {
  return (
    
    <div>
      <div>
      件数：{totalCount}件
    </div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}:{blog.createdAt}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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