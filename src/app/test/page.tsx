// import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = 406535399;
// const analyticsDataClient = new BetaAnalyticsDataClient();

// async function runReport() {
//   const [response] = await analyticsDataClient.runReport({
//     property: `properties/${propertyId}`,
//     dateRanges: [
//       {
//         startDate: '2023-09-15',
//         endDate: 'today',
//       },
//     ],
//     dimensions: [
//       {
//         name: 'city',
//       },
//     ],
//     metrics: [
//       {
//         name: 'activeUsers',
//       },
//     ],
//   });
//   return response;
// }

export default async function Home() {
  // const data = await runReport();

  return (
    <div className="max-w-3xl my-0 mx-auto h-screen">
      <iframe className="w-full h-full" src="https:1000y.co.kr"></iframe>
    </div>
  );
}
