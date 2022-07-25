const Qualitys = (qualities) => {

    return qualities.map((q)=> (
      <span key={q._id} className={`badge bg-${q.color} m-2`}>
        {q.name}
      </span>
    ))
  }

export default Qualitys
