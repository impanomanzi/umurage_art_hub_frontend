import { createContext, useState } from "react";
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import settings from "../components/settings.json";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const APIContext = createContext({});
export function APIProvider({ children }) {
  const fetchWithAuth = useFetchWithAuth();
  const [API, setAPI] = useState({
    login: async (formData) => {
      try {
        const response = await fetchWithAuth(
          `${settings.server_domain}/custom-login`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAnnouncements: async () => {
      try {
        const resp = await fetch(
          `${settings.server_domain}/get_pending_exhibitions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addPainting: async (formData) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/add_new_painting`,
          {
            method: "PUT",
            headers: {
              encType: "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addPainter: async (formData) => {
      try {
        let options = {
          method: "POST",
          headers: {
            encType: "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        };

        const response = await fetch(
          `${settings.server_domain}/add_new_painter`,
          options
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updatePainter: async (formData) => {
      try {
        let options = {
          method: "POST",
          headers: {
            encType: "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        };

        const response = await fetch(
          `${settings.server_domain}/update_painter`,
          options
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPaintings: async () => {
      try {
        const res = await fetch(`${settings.server_domain}/get_paintings`);
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getExhibitions: async () => {
      try {
        const res = await fetch(`${settings.server_domain}/get_exhibitions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAllExhibitions: async () => {
      try {
        const res = await fetch(
          `${settings.server_domain}/get_all_exhibitions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPendingExhibitions: async () => {
      try {
        const res = await fetch(
          `${settings.server_domain}/get_pending_exhibitions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();

        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },
    addBlog: async (formData) => {
      try {
        const resp = await fetch(
          `${settings.server_domain}/blog/add_new_blog`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getBlogs: async () => {
      try {
        const response = await fetch(
          `${settings.server_domain}/blog/get_blogs`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteBlog: async (id) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/blog/delete_blog/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPainters: async () => {
      const response = await fetch(`${settings.server_domain}/get_painters`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    },
    getExhibitionPaintings: async (id) => {
      try {
        const resp = await fetch(
          `${settings.server_domain}/get_exhibition_paintings/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              clientId: localStorage.getItem("clientId"),
              exId: id,
            },
          }
        );
        const data = await resp.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },
    getAllExhibitionPaintings: async () => {
      try {
        const resp = await fetch(
          `${settings.server_domain}/get_all_exhibition_paintings`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUserPaintings: async (formData) => {
      try {
        const res = await fetchWithAuth(
          `${settings.server_domain}/get_user_paintings`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getCustomers: async () => {
      try {
        const response = await fetch(
          `${settings.server_domain}/get_customers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deletePainting: async (id) => {
      let userId;
      try {
        userId = jwtDecode(localStorage.getItem("token")).id;
      } catch (error) {
        toast.error("Your session expired");
      }
      const response = await fetch(
        `${settings.server_domain}/delete_painting/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: userId,
          },
        }
      );
      const data = await response.json();
      return data;
    },
    deleteExhibitionPainting: async (id) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/delete_exhibition_painting/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },

    deleteExhibition: async (id, name) => {
      const response = await fetch(
        `${settings.server_domain}/delete_exhibition/${id}/${name}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    },
    deletePainter: async (id) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/delete_painter/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },

    deleteCustomer: async (id) => {
      try {
        const formData = new FormData();
        formData.append("customer_id", id);
        const response = await fetch(
          `${settings.server_domain}/delete_customer`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },

    changeCustomerStatus: async (id, status, exId) => {
      try {
        const formData = new FormData();
        formData.append("customer_id", id);
        formData.append("current_status", status);
        formData.append("e_name", exId);
        const response = await fetch(
          `${settings.server_domain}/update_customer_status`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },
    changeExhibitionStatus: async (id, status) => {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("current_status", status);
        const response = await fetch(
          `${settings.server_domain}/change_exhibition_status`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(String(error));
      }
    },
    checkPayment: async (formData) => {
      try {
        const resp = await fetch(`${settings.server_domain}/check_payment`, {
          method: "POST",
          body: formData,
        });
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addExhibition: async (formData) => {
      try {
        const resp = await fetch(
          `${settings.server_domain}/add_new_exhibition`,
          {
            method: "PUT",
            headers: {
              encType: "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    changePassword: async (formData, userId) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/change_password`,
          {
            method: "POST",
            headers: {
              encType: "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              userId: userId,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addExhibitionPainting: async (formData) => {
      try {
        const response = await fetch(
          `${settings.server_domain}/add_exhibition_painting`,
          {
            method: "POST",
            headers: {
              encType: "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    verifyEmail: async (formData) => {
      try {
        const resp = await fetch(`${settings.server_domain}/verify`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likePainting: async (id) => {
      try {
        const resp = await fetch(`${settings.server_domain}/like/${id}`, {
          method: "POST",
        });
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dislikePainting: async (id) => {
      try {
        const resp = await fetch(`${settings.server_domain}/dislike/${id}`, {
          method: "POST",
        });
        const data = await resp.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return (
    <APIContext.Provider value={{ API, setAPI }}>
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;
