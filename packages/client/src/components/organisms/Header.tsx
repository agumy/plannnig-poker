import * as React from 'react'
import { Layout, Row, Col, Typography } from 'antd'
import CardIcon from '../../../asset/Card.png'

const { Header: AntHeader } = Layout
const { Title } = Typography

export const Header = () => {
  return (
    <AntHeader>
      <Row align="middle" gutter={16}>
        <Col>
          <img src={CardIcon} width="30" height="30" />
        </Col>
        <Col>
          <Title
            level={1}
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 'auto',
              fontSize: '20px',
            }}
          >
            Planning Porker Online
          </Title>
        </Col>
      </Row>
    </AntHeader>
  )
}
