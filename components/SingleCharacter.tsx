type MType = {
    name: string,
    status: string,
}

const SingleCharacter = (props: MType) => {
  const {name,status} = props

  
  return (
    <>
        <div>{name}</div>
        <div>{status}</div>
    </>
  )
}

export default SingleCharacter