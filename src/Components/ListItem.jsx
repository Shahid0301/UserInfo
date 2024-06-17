function ListItem({ user }) {
  return (
    <div key={user.id} className="container">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Username: {user.username}</p>
      <p>
        Address: {user.address.street} {user.address.city}{" "}
        {user.address.zipcode}
      </p>
    </div>
  );
}

export default ListItem;
