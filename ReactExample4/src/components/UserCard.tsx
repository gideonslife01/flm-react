import React from "react";

type UserCardProps = {
  name: string;
  age?: number; // 선택적 props
};

const UserCard: React.FC<UserCardProps> = ({ name, age }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
      <h2>{name}</h2>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

export default UserCard;
