import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

const colorForScore = (score) => {
  if (score >= 75) return "#2AA37B"; // scan green
  if (score >= 50) return "#D98E2B"; // flag amber
  return "#C4453D"; // alert red
};

const ScoreGauge = ({ score, label }) => {
  const color = colorForScore(score);
  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <RadialBarChart
          width={160}
          height={160}
          cx={80}
          cy={80}
          innerRadius={60}
          outerRadius={76}
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "#EDEAE0" }} dataKey="value" cornerRadius={8} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-medium text-ink900">{score}</span>
          <span className="font-mono text-[10px] text-muted">out of 100</span>
        </div>
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
};

export default ScoreGauge;
