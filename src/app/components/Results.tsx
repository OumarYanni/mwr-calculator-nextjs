export default function Results({ data }: any) {
  return (
    <div className="mt-4 p-4 border bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold">Résultats</h2>
      <p className="mt-2">
        Taux de rendement annuel : {data?.MWR_annualized_percentage}%
      </p>
      <pre className="mt-4 p-2 bg-gray-200 rounded-md font-mono">
        {JSON.stringify(data.table, null, 2)}
      </pre>
    </div>
  );
}
