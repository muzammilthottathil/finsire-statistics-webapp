function Card({ text, value }) {
  return (
    <div className="data-item">
      <h2>{text}</h2>
      <p>{value}</p>
    </div>
  );
}

export default Card;
