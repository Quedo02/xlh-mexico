export default function Contacto() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 primary">¡Hola, Next.js + Bootstrap!</h1>
      <button className="btn btn-primary">Botón Bootstrap</button>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}/>
    </div>
    </div>
  );
}
