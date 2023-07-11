import { FC } from "react"
import {
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

interface Props {
  progress: string | number
}

const ProgressBar: FC<Props> = (props) => {
  const data = [{ name: "progress", value: props.progress }]
  const circleSize = 30

  return (
    <div style={{ width: "100%", height: "30px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          width={circleSize}
          height={circleSize}
          cx="50%"
          cy="50%"
          innerRadius={12}
          outerRadius={18}
          barSize={5}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={circleSize / 2}
            fill="#BF40BF"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressBar
