import React, { useState, useEffect } from "react";
import Layout from "/components/layout/Layout";
import { client } from "/config/prismic-configuration";
import Prismic from "prismic-javascript";
import data from "/data/news";
import Link from "next/link";
import Pagination from "../components/news/Pagination";

const POSTS_PER_PAGE = 10;

function News({ posts }) {
  const [currentPage, setCurrentPage] = useState(0);
  const maxPages = Math.ceil(posts.results.length / POSTS_PER_PAGE);
  function paginate(pageNumber) {
    if (pageNumber < maxPages && pageNumber >= 0) setCurrentPage(pageNumber);
  }

  let postList = [];

  for (let i = currentPage * POSTS_PER_PAGE; i < posts.results.length; i++) {
    if (postList.length >= POSTS_PER_PAGE) {
      break;
    }
    let publicationDate = new Date(posts.results[i].first_publication_date);
    postList.push(
      <div
        className="bg-white p-4 mt-2 mx-4 rounded-xl border border-opacity-10 border-double border-black md:w-9/12 md:mx-auto lg:w-8/12 xl:w-7/12"
        key={posts.results[i].id}
      >
        <h1 className="text-xl mb-2">{posts.results[i].data.title[0].text}</h1>
        <p className="mb-8 text-xs text-gray-800">{Intl.DateTimeFormat("de-DE").format(publicationDate)}</p>
        <p className="mb-5">{posts.results[i].data.summary[0].text}</p>
        <Link
          href={{
            pathname: "news/[id]",
            query: {
              id: posts.results[i].slugs[0]
            }
          }}
        >
          <a className="bg-black hover:bg-blue-800 text-white p-2">Leer más</a>
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <h1 className="pt-20 w-min mx-auto text-4xl">{data.title}</h1>
      <div className="pt-2 pb-10">{postList}</div>
      <div className="pb-20">
        <Pagination currentPage={parseInt(currentPage)} maxPages={parseInt(maxPages)} paginate={paginate} />
      </div>
    </Layout>
  );
}

export default News;

export const getStaticProps = async () => {
  const posts = await client.query(Prismic.Predicates.at("document.type", "entrada"));
  return {
    props: {
      posts
    }
  };
};
