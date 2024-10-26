// import { CONTRACT_ABI, contract_address } from '@/contracts/abi'
// import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
// import React, { useState } from 'react'
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from '@/components/ui/table'

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select'
// import { Label } from '@/components/ui/label'

// type Props = {}

// const index = (props: Props) => {
//   const address = useAddress()

//   const { contract } = useContract(contract_address, CONTRACT_ABI)
//   const {
//     data: refData,
//     isLoading: isrefDataLoading,
//     error: refDataError,
//   } = useContractRead(contract, 'getDownlineReferrals', [address])
//   console.log('refdata', refData)

//   const [lvl, setLvl] = useState(0)

//   const getPackageName = (pkg: any) => {
//     pkg = Number(pkg)

//     if (pkg === 0) {
//       return 'Basic (100 - 1999)'
//     } else if (pkg === 1) {
//       return 'Standard (2000 - 2999)'
//     } else if (pkg === 2) {
//       return 'VIP (3000 - 4999)'
//     } else if (pkg === 3) {
//       return 'VVIP (above 5000)'
//     }
//   }

//   return (
//     <div>
//       <section className='text-white body-font mx-auto p-4 w-[90vw]'>
//         <div className='mt-2 bg-white text-black rounded-md p-4'>
//           <div className='grid gap-2 '>
//             <Select
//               onValueChange={(value) => setLvl(Number(value))}
//               defaultValue='0'
//             >
//               <SelectTrigger className='w-full'>
//                 <SelectValue placeholder='Select Level' />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value='0'>Level 1</SelectItem>
//                 <SelectItem value='1'>Level 2</SelectItem>
//                 <SelectItem value='2'>Level 3</SelectItem>
//                 <SelectItem value='3'>Level 4</SelectItem>
//                 <SelectItem value='4'>Level 5</SelectItem>
//                 <SelectItem value='5'>Level 6</SelectItem>
//                 <SelectItem value='6'>Level 7</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <h2 className='text-2xl font-bold mb-4 mt-2'>
//             Level {lvl + 1} Details
//           </h2>
//           <hr className='w-full h-[2px] bg-black' />
//           <Table className='w-full'>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Address</TableHead>
//                 <TableHead>Package (in POL)</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {refData &&
//                 refData[lvl] &&
//                 refData[lvl].length > 0 &&
//                 refData[lvl][0].length > 0 &&
//                 refData[lvl][0].map((data: any) => {
//                   console.log('data.', data[0], data[1])
//                   return (
//                     <TableRow>
//                       <TableCell className='break-all'>
//                         {data && data[0]}
//                       </TableCell>
//                       <TableCell>
//                         {data && data[1].toString() / 1000000000}
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//             </TableBody>
//           </Table>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default index
