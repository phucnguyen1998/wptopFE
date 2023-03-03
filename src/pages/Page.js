import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Page(props) {
  let { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/page-menus/${id}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      };

      axios(config)
        .then(function (res) {
          let data = res.data.data;
          console.log(data);
          setContent(data?.attributes?.contents);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
    <div id="main">
      <div id="main_content">
        <div
          className="single_post"
          itemScope
          itemType="https://schema.org/CreativeWork"
        >
          {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
        </div>
      </div>
    </div>
    <div className="clear" />
    </>
    
  );
}

export default Page;
