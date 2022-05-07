import React, { Fragment, useState, useTransition } from 'react';

type Member = "Alice" | "Bob" | "Carol";

type Task = {
  id: number;
  assignee: Member;
  title: string;
  description: string;
};

const sleep = (ms: number) => {
  const startTime = performance.now();
  while (performance.now() - startTime < ms);
}

const allTasks: Task[] = [
  {
    id: 1,
    assignee: "Alice",
    title: "React 学習",
    description: "v18 の機能についてキャッチアップする",
  },
  {
    id: 2,
    assignee: "Bob",
    title: "React 学習",
    description: "v18 の機能についてキャッチアップする",
  },
  {
    id: 3,
    assignee: "Carol",
    title: "React 学習",
    description: "v18 の機能についてキャッチアップする",
  },
  {
    id: 4,
    assignee: "Alice",
    title: "React 学習",
    description: "v18 の機能についてキャッチアップする",
  },
  {
    id: 5,
    assignee: "Bob",
    title: "React 学習",
    description: "v18 の機能についてキャッチアップする",
  },
]

const TaskCard: React.FC<Task> = (task: Task) => {
  const { assignee, title, description } = task;

  const getBorderColor = (member: Member): string => {
    if (member === "Alice") return "aqua";
    if (member === "Bob") return "lime";
    return "orange";
  };

  return (
    <div
      style={{
        border: `5px solid ${getBorderColor(assignee)}`,
        borderRadius: "18px",
        margin: "20px",
        padding: "10px",
        width: "200px",
      }}
    >
      <div style={{ fontSize: "22px" }}>{title}</div>
      <div style={{ fontSize: "14px", fontWeight: "bold" }}>{assignee}</div>
      <hr />
      <div style={{ fontSize: "14px" }}>{description}</div>
    </div>
  );  
}

const TaskCardList: React.FC<{ taskList: Task[],  isPending:boolean }> = ({ taskList,  isPending }: { taskList: Task[],  isPending:boolean }) => {
  if (isPending) return <div>Loading...</div>; 
  
  return taskList.length > 0 ? (
    <ul style={{ listStyleType: "none" }}>
      {taskList.map((task) => {
        return (
          <li key={task.id}>
            <TaskCard {...task} />
          </li>
        );
      })}
    </ul>
  ) : null;
}

const DemoTransition:React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member>();
  const [headline, setHeadline] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isPending, startTransition] = useTransition();

  const members: Member[] = ["Alice", "Bob", "Carol"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const member = e.currentTarget.value as Member;
    setSelectedMember(member);
    setHeadline(`${member}'s task`);
    startTransition(() => {
    setTaskList(() => {
      sleep(1500);
      return allTasks.filter((t) => t.assignee === member);
    });
  });
  };

  return (
    <>
      {members.map((m) => {
        return (
          <Fragment key={m}>
            <input
              type="radio"
              value={m}
              onChange={handleChange}
              checked={m === selectedMember}
            />
            {m}{" "}
          </Fragment>
        );
      })}
      <h1>{headline}</h1>
      <TaskCardList taskList={taskList} isPending={isPending} />
    </>
  );



}

export default DemoTransition;
