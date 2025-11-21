import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomePage = () => {
  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeTaskCount, setactiveTaskCount] = useState([0]);
  const [completeTaskCount, setcompleteTaskCount] = useState([0]);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  useEffect(() =>{
    fetchTasks();
  },[dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      const data = res.data;

      settaskBuffer(data.tasks);          // array tasks
      setactiveTaskCount(data.activeCount); 
      setcompleteTaskCount(data.completeCount);

    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  const handleNext = () => {
    if(page < totalPages){
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
     if(page > 1){
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //biến lưu danh sách nhiệm vụ đã lọc
  const filterTasks = taskBuffer.filter((task) => {
    switch(filter){
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
      default:
        return true;
    }
  });

  const visibleTasks = filterTasks.slice(
    (page -1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if(visibleTasks.length === 0){
    handlePrev();
  }

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      {/* Concentric Squares - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
            repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
            repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
            repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
          `,
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
      
          {/* Đầu trang */}
          <Header/>

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdd={handleTaskChanged} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          {/* Danh sách công việc  */}
          <TaskList 
            filteredTask = {visibleTasks} 
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter 
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
