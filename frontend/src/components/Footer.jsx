import React from 'react'

const Footer = ({ completeTasksCount = 0, activeTasksCount = 0 }) => {
  const hasTasks = completeTasksCount + activeTasksCount > 0;

  return (
    hasTasks && (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {completeTasksCount > 0 && (
            <>
              Tuyệt vời! Bạn đã hoàn thành {completeTasksCount} việc
              {activeTasksCount > 0 && `, còn ${activeTasksCount} việc nữa thôi.`}
            </>
          )}

          {completeTasksCount === 0 && activeTasksCount > 0 && (
            <>Hãy bắt đầu làm {activeTasksCount} nhiệm vụ nào!</>
          )}
        </p>
      </div>
    )
  )
}

export default Footer
