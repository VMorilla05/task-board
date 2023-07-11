import { FC } from "react"

interface Props {
  className?: string
}

const Divider: FC<Props> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </>
  )
}

export default Divider
