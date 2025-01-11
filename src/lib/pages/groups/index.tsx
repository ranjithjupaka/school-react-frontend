import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import 'react-toastify/dist/ReactToastify.css'
import {
  Mail,
  Send,
  Users,
  Plus,
  Eye,
  Trash2,
  User,
  Edit2Icon,
} from 'lucide-react'
import Select from 'react-select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import Sidebar from '@/lib/layout/Sidebar'
import axios from 'axios'
import { GroupDialog } from '@/lib/components/GroupDialog'
import { toast } from 'react-toastify'

const index = () => {
  const [groups, setGroups] = useState([])
  const [leadersEmail, setLeadersEmail] = useState('')
  const [leadersRecord, setLeadersRecord] = useState('')
  const [newGroupName, setNewGroupName] = React.useState('')
  const [selectedMembers, setSelectedMembers] = useState<
    { value: string; label: string }[]
  >([])
  const [emails, setEmails] = useState<{ value: string; label: string }[]>([])

  const getGroups = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/groups', {
        headers: {
          Accept: 'application/json',
        },
      })
      console.log('groups list', response.data.data)

      setGroups(response.data.data)
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  const getEmails = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await axios.get(
        `http://127.0.0.1:5000/parent_emails/${email}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      console.log('emails list', response.data)

      let data = response.data
      const leaders_email = data.teacher_name[0]
      const leaders_record = data.teacher_record[0]
      let emails = data.members
      console.log('emails', emails, leaders_email, leaders_record)

      setEmails(emails)
      setLeadersEmail(leaders_email)
      setLeadersRecord(leaders_record)
    } catch (error) {
      console.error('Error fetching groups:', error)
    }
  }

  useEffect(() => {
    getGroups()
    getEmails()
  }, [])

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (newGroupName.trim() && selectedMembers.length > 0) {
        let members = selectedMembers.map((m) => m.value)
        const response = await axios.post(
          'http://127.0.0.1:5000/groups',
          {
            Leaders: [`${leadersRecord}`],
            Name: newGroupName.trim(),
            Parents: members,
            Teacher: `${leadersEmail}`,
          },
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        console.log('groups creation response', response.data)
        setNewGroupName('')
        setSelectedMembers([])
        getGroups()
        toast.success('Group created successfully')
      } else {
        toast.error('Please enter group name and members')
      }
    } catch (error) {
      toast.error('Error creating group')
      console.error('Error fetching groups:', error)
    }
  }

  const viewMembers = (e: React.FormEvent, index: number) => {
    e.preventDefault()
    console.log('view members', groups[index])
  }

  const deleteGroup = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    const response = await axios.delete(`http://127.0.0.1:5000/groups/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    console.log('groups deletion response', response.data)

    const data = response.data.data

    if (data.deleted) {
      toast.success('Group deleted successfully')
      getGroups()
    } else {
      toast.error('Error deleting group')
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <header className='bg-white shadow-sm z-10'>
        <div className='max-w-full mx-auto px-8 py-4 flex justify-between items-center'>
          <a href='/' className='text-2xl font-bold text-gray-900'>
            School App
          </a>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='User' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='w-4/5 overflow-auto p-8'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-2xl font-bold mb-6'>Manage Groups</h1>

            <form
              onSubmit={handleCreateGroup}
              className='mb-8 space-y-4 bg-white p-6 rounded-lg shadow'
            >
              <h2 className='text-lg font-semibold'>Create a New Group</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='groupName'>Group Name</Label>
                  <Input
                    id='groupName'
                    placeholder='Enter group name'
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='groupMembers'>Group Members</Label>
                  <Select
                    isMulti
                    name='emails'
                    options={emails}
                    // styles={{
                    //   control: (baseStyles, state) => ({
                    //     ...baseStyles,
                    //     stat
                    //   }),
                    // }}
                    value={selectedMembers}
                    onChange={(selected) =>
                      setSelectedMembers(
                        selected as { value: string; label: string }[]
                      )
                    }
                  />
                  {/* <Textarea
                    id='groupMembers'
                    placeholder='Enter email addresses, separated by commas'
                    value={newGroupMembers}
                    onChange={(e: any) => setNewGroupMembers(e.target.value)}
                    className='h-full min-h-[38px]'
                  /> */}
                </div>
              </div>
              <Button type='submit'>Create Group</Button>
            </form>

            <h2 className='text-lg font-semibold mb-4'>Existing Groups</h2>
            <div className='space-y-2'>
              {groups.map((group: any, index: number) => {
                let parents_email = group.fields['Parent Email']
                let parents_record = group.fields['Parents']

                let members = []

                if (parents_email && parents_record) {
                  for (let i = 0; i < parents_email.length; i++) {
                    members.push({
                      value: parents_record[i],
                      label: parents_email[i],
                    })
                  }
                }

                console.log('members', members)

                return (
                  group.fields.Name && (
                    <div
                      key={group.id}
                      className='flex items-center justify-between bg-white p-4 rounded-lg shadow'
                    >
                      <span className='text-lg'>{group.fields.Name}</span>
                      <div className='flex gap-2'>
                        <GroupDialog
                          data={{
                            name: group.fields.Name,
                            members: members,
                            emails: emails,
                          }}
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            title='Add Members'
                          >
                            <Edit2Icon className='h-4 w-4 mr-1' /> Edit
                          </Button>
                        </GroupDialog>
                        <GroupDialog
                          data={{
                            name: group.fields.Name,
                            members: members,
                          }}
                          name='view'
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            title='View Members'
                          >
                            <Eye className='h-4 w-4 mr-1' /> View
                          </Button>
                        </GroupDialog>
                        <Button
                          variant='outline'
                          size='sm'
                          title='Delete Group'
                          onClick={(e) => deleteGroup(e, group.id)}
                        >
                          <Trash2 className='h-4 w-4 mr-1' /> Delete
                        </Button>
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default index
