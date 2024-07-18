import settings from "../components/settings.json";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
export const API = {
  login: async (options) => {
    try {
      const response = await fetch(
        `${settings.server_domain}/custom-login`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(String(error));
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
      toast.error(String(error));
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
      toast.error(String(error));
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
      toast.error(String(error));
    }
  },
  getPaintings: async () => {
    try {
      const res = await fetch(`${settings.server_domain}/get_paintings`);
      const data = await res.json();
      localStorage.setItem("paintings", data.data.length);
      return data;
    } catch (error) {
      toast.error(String(error));
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
      toast.error(String(error));
    }
  },
  getAllExhibitions: async () => {
    try {
      const res = await fetch(`${settings.server_domain}/get_all_exhibitions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      toast.error(String(error));
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
  getBlogs: async () => {
    try {
      const response = await fetch(`${settings.server_domain}/blog/get_blogs`);
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(String(error));
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
      toast.error(String(error));
    }
  },
  getUserPaintings: async () => {
    try {
      let formData = new FormData();
      let userId;
      try {
        userId = jwtDecode(localStorage.getItem("token")).id;
      } catch (error) {
        throw new Error("your session expired");
      }
      formData.append("userId", userId);
      const res = await fetch(`${settings.server_domain}/get_user_paintings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(String(error));
    }
  },
  getCustomers: async () => {
    try {
      const response = await fetch(`${settings.server_domain}/get_customers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(String(error));
    }
  },
  deletePainting: async (params) => {
    let userId;
    try {
      userId = jwtDecode(localStorage.getItem("token")).id;
    } catch (error) {
      toast.error("Your session expired");
    }
    const response = await fetch(
      `${settings.server_domain}/delete_painting/${params.item.id}`,
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
  deleteExhibitionPainting: async (params) => {
    try {
      const response = await fetch(
        `${settings.server_domain}/delete_exhibition_painting/${params.item.id}`,
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

  deleteExhibition: async (params) => {
    const response = await fetch(
      `${settings.server_domain}/delete_exhibition/${params.item.id}/${params.item.name}`,
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
  deletePainter: async (params) => {
    try {
      const response = await fetch(
        `${settings.server_domain}/delete_painter/${params.item.id}`,
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

  deleteCustomer: async (params) => {
    try {
      const formData = new FormData();
      formData.append("customer_id", params.item.id);
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
  deleteBlog: async (params) => {
    try {
      const response = await fetch(
        `${settings.server_domain}/blog/delete_blog/${params.item.id}`,
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
  changeCustomerStatus: async (params) => {
    try {
      const formData = new FormData();
      formData.append("customer_id", params.item.id);
      formData.append("current_status", params.item.status);
      formData.append("e_name", params.item.exId);
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
  changeExhibitionStatus: async (params) => {
    try {
      const formData = new FormData();
      formData.append("id", params.item.id);
      formData.append("current_status", params.item.status);
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
};
