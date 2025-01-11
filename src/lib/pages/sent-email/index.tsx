import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import 'react-toastify/dist/ReactToastify.css'
import { Mail, Send, Users, Plus, Eye, Trash2, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import React from 'react'
import Sidebar from '@/lib/layout/Sidebar'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const index = () => {
  const [sentEmails, setSentEmails] = useState([])

  const getSentMails = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await fetch(
        `http://localhost:5000/sent_emails/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      console.log('data', data)

      setSentEmails(data.data)
    } catch (error) {
      console.error('Error fetching sent emails:', error)
    }
  }

  useEffect(() => {
    getSentMails()
  }, [])

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <header className='bg-white shadow-sm z-10'>
        <div className='max-w-full mx-auto px-8 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>School App</h1>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='User' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar active={3} />
        <main className='w-full overflow-auto p-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>Sent Emails</h1>
              <Button onClick={() => getSentMails()}>Refresh</Button>
            </div>

            <div className='space-y-4 bg-white p-4 mt-4 rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[200px]'>To</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className='text-right w-[180px]'>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentEmails.map((email) => (
                    <TableRow key={email['id']}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-6 w-6 flex-shrink-0'>
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${email['fields']['toEmail']}`}
                              alt={email['fields']['toEmail']}
                            />
                            <AvatarFallback>
                              {email['fields']['toEmail']}
                            </AvatarFallback>
                          </Avatar>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className='block truncate w-[250px]'>
                                  {email['fields']['toEmail']}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span className='w-[50%]'>
                                  {email['fields']['toEmail']}
                                </span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='max-w-md truncate'>
                          {email['fields']['emailContent']}
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        {new Date(
                          email['fields']['Timestamp']
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
