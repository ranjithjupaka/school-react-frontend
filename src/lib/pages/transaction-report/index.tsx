// import { useState } from 'react'

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from '@/components/ui/table'
// import { useAuth } from '@/contexts/AuthContext'


// const DepositReport = () => {
//   const { userData } = useAuth()

//   const getISTDate = (timestamp: number) => {
//     const date = new Date(timestamp * 1000)
//     return date.toLocaleString('en-US', {
//       timeZone: 'Asia/Kolkata',
//       hour12: true,
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       day: 'numeric',
//       month: 'numeric',
//       year: 'numeric',
//     })
//   }

//   console.log('last claimed', getISTDate(userData['lastClaim']))

//   const formatIncome = (income: number) => {
//     const stakes = income / 1000000000
//     return stakes.toFixed(2)
//   }

//   return (
//     <>
//       <section className='text-white body-font mx-auto p-4 w-[90vw]'>
//         <div className='mt-2 bg-white text-black rounded-md p-4'>
//           <h2 className='text-2xl font-bold mb-4'>Transactions Report</h2>
//           <hr className='w-full h-[2px] bg-black' />
//           {userData['transactions'] && userData['transactions'].length > 0 ? (
//             <Table className='w-full'>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Amount (in POL)</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {userData['transactions'].map((transaction: any) => (
//                   <TableRow>
//                     <TableCell>
//                       {transaction['transactionType'].toString() === '1'
//                         ? 'Withdrawal'
//                         : 'Deposit'}
//                     </TableCell>
//                     <TableCell>
//                       {formatIncome(transaction.amount.toString())}
//                     </TableCell>
//                     <TableCell>
//                       {getISTDate(transaction.timestamp.toString())}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           ) : (
//             <h1>No Transactions</h1>
//           )}
//         </div>
//       </section>
//     </>
//   )
// }

// export default DepositReport
