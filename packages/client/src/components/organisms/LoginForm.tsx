import * as React from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { SocketContext } from '../../context/SocketContext'

const _LoginForm = React.memo(() => {
  const { commands } = React.useContext(SocketContext)

  const onFinish = React.useCallback((value) => {
    commands.joinRoom(value.name, value.roomId)
  }, [])

  return (
    <Form name="login" layout="vertical" onFinish={onFinish}>
      <Form.Item label="Your Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Room ID" name="roomId">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Join!
        </Button>
      </Form.Item>
    </Form>
  )
})

export const LoginForm = styled(_LoginForm)``
