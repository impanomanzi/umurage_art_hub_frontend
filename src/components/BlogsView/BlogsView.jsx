import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { blogKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
import EditButton from "../EditButton/EditButton";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
import EditBlogForm from "../Forms/BlogCreationForm/BlogEditForm";
function BlogsView() {
  const [blogs, setBlogs] = useState([]);
  const [interactedBlog, setInteractedBlog] = useState("");
  const [currentBlogId, setCurrentBlogId]= useState(null);
  const [currentBlogData, setCurrentBlogData]= useState({})
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const [showEditForm, setShowEditForm] = useState(false);

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

  const handleDelete = async () => {
    try {
      const resp = await API.deleteBlog(currentBlogId);
      if (resp.success) {
        setToast({ variant: "success", message: "Blog deleted" });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== currentBlogId));
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };
  const handleActionButtonClicked = async (id, index) => {
    setInteractedBlog(String(id) + index);
    setCurrentBlogId(id);
    setShowDeleteConfirm(true);
    setInteractedBlog("");
  };


  const handleEditBlog = async (id, formData) => {
    const resp = await API.updateBlog(id, formData);
    if (resp.success) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === currentBlogData.id ? { ...resp.data } : blog
        )
      );
      setToast({ variant: "success", message: "Blog updated" });
    } else {
      setToast({ variant: "danger", message: resp.message });
    }
  };

  const showEditBlogForm = (data) => {
    setShowEditForm(true);
    setCurrentBlogData(data);
  };

  const generateActions = (id, data) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() => handleActionButtonClicked(id, 0)}
        isLoading={interactedBlog === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
      <EditButton
      action={() => showEditBlogForm(data)}
      variant={"outline-primary"}
    />,
    ];
  };
  const preprocessedData = useMemo(() => {
    return blogs.map((blog) => ({
      ...blog,
      actions: generateActions(blog.id, blog),
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
      <EditBlogForm
        blogData={currentBlogData}
        onHide={() => setShowEditForm(!showEditForm)}
        show={showEditForm}
        onSubmit={handleEditBlog}
      />
      {showDeleteConfirm&&<DeleteConfirmDialog showModal={showDeleteConfirm} onClick={handleDelete} onClose={()=>setShowDeleteConfirm(!showDeleteConfirm)} itemName={"Blog"}/>}
    </>
  );
}

export default BlogsView;
