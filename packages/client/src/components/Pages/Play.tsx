import * as React from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Space } from 'antd'
import { SocketContext } from '../../context/SocketContext'

type Props = {
  isHost: boolean
  isPlaying: boolean
}

const _Play: React.FCX<Props> = (props) => {
  const { room, user } = React.useContext(SocketContext)
  return (
    <>
      <Row className={props.className} justify="center">
        <Col className="play" span={12}>
          <Row justify="center">
            <Space>
              <Col>{user.isHost && 'You are Host'}</Col>
              <Col>{!props.isPlaying && <Button>Start</Button>}</Col>
              {props.isPlaying && (
                <>
                  <Col>Card:</Col>
                  <Col>
                    <Input />
                  </Col>
                  <Col>
                    <Button>Draw</Button>
                  </Col>
                  <Col>{user.name}</Col>
                </>
              )}
            </Space>
          </Row>
          <Row justify="center">
            <Space>{room.members.map((member) => member.name)}</Space>
          </Row>
        </Col>
        <Col span={12}>Right</Col>
      </Row>
    </>
  )
}

_Play.defaultProps = {
  isHost: false,
  isPlaying: true,
}

const Play = styled(_Play)`
  height: 100%;

  > .play {
    padding: 20px;
  }
`

export default Play
