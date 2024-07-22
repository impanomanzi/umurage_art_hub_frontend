import "./RefreshLayout.css";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetExhibitions } from "../hooks/useGetExhibitions";
import { useGetPaintings } from "../hooks/useGetPaintings";
import useExhibitions from "../hooks/useExhibitions";
import usePaintings from "../hooks/usePaintings";
import useGetAnnouncements from "../hooks/useGetAnnouncements";
import useAnnouncements from "../hooks/useAnnouncements";
import ProgressBar from "react-bootstrap/ProgressBar";
import Footer from "../components/Footer/Footer";
function RefreshLayout() {
  const [refreshing, setRefreshing] = useState(true);
  const getExhibitions = useGetExhibitions();
  const getPaintings = useGetPaintings();
  const getAnnouncements = useGetAnnouncements();
  const { exhibitions } = useExhibitions();
  const { paintings } = usePaintings();
  const { announcements } = useAnnouncements();
  const totalTasks = 3;
  const [completedTasks, setCompletedTasks] = useState(0);
  const progress = useMemo(() => {
    const value = (completedTasks / totalTasks) * 100;
    return value < 1 ? 10 : value;
  }, [completedTasks]);
  const updateProgress = () => {
    setCompletedTasks((prev) => prev + 1);
  };
  const refresh = async () => {
    try {
      setCompletedTasks(0);
      await Promise.all([
        getAnnouncements().then(updateProgress),
        getExhibitions().then(updateProgress),
        getPaintings().then(updateProgress),
      ]);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!exhibitions?.length || !paintings?.length || !announcements?.length) {
      refresh();
    } else {
      setRefreshing(false);
    }
  }, [navigator.onLine]);
  return refreshing ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProgressBar now={progress} variant="progress" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        <img src="/loading.gif" style={{ width: "120px" }} />
      </div>
    </div>
  ) : (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default RefreshLayout;
