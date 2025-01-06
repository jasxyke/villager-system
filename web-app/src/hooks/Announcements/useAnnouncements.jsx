import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAnnouncements = async (onError, page = 1) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/announcements?page=${page}`);
      setAnnouncements(res.data.data); // Assuming the API returns paginated data in `data`
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
      setTotalRecords(res.data.total);
    } catch (error) {
      setLoading(false);
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (announcementForm, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/announcements", announcementForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess(res.data.message);
      let newAnnouncements = [...announcements, res.data.announcement];
      console.log(newAnnouncements);
      setAnnouncements(newAnnouncements);
    } catch (error) {
      console.log(error);
      onError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const changePicture = async (id, imgFile, onSuccess, onError) => {
    setLoading(true);
    console.log(imgFile);
    try {
      const res = await axiosClient.post(
        "/announcements/img/" + id,
        { image: imgFile },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onSuccess(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };

  const replaceItem = (id, newObject) => {
    const updatedItems = items.map((item) =>
      item.id === id ? newObject : item
    );
    setAnnouncements(updatedItems);
  };

  const editAnnouncement = async (id, formData, onSuccess, onError) => {
    try {
      const res = await axiosClient.put("/announcements/" + id, formData);
      // replaceItem(res.data.announcement.id, res.data.announcement);
      getAnnouncements();
      onSuccess("Announcement edited!");
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };
  return {
    announcements,
    loading,
    addAnnouncement,
    getAnnouncements,
    editAnnouncement,
    changePicture,
  };
};

export default useAnnouncements;
