import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { blogKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
function BlogsView() {
  const [blogs, setBlogs] = useState([]);
  const [interactedBlog, setInteractedBlog] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const getBlogs = async () => {
    try {
      const resp = await API.getBlogs();
      setBlogs(resp.data);
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await API.deleteBlog(id);
      if (resp.success) {
        setToast({ variant: "success", message: "Blog deleted" });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };
  const handleActionButtonClicked = async (id, index) => {
    setInteractedBlog(String(id) + index);
    await handleDelete(id);
    setInteractedBlog("");
  };

  const generateActions = (id) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() => handleActionButtonClicked(id, 0)}
        isLoading={interactedBlog === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
    ];
  };
  const preprocessedData = useMemo(() => {
    return blogs.map((blog) => ({
      ...blog,
      actions: generateActions(blog.id),
    }));
  }, [blogs, interactedBlog]);
  const listItems = {
    items: preprocessedData,
    keyword: blogKeywords,
    isLoading: isLoading,
    confirmationRequired: true,
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "add_blog" }}>
          New
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "all" }}>
          All
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet context={[listItems]} />
    </>
  );
}

export default BlogsView;
