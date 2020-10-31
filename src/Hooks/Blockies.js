import blockies from "ethereum-blockies"

export default address => {
  const imgSrc = blockies.create({ seed: address }).toDataURL()
  return imgSrc
}
