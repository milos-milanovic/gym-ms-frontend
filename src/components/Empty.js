import { Empty as AntEmpty, Button } from 'antd';
import React from 'react';

export default function EmptyResponse(props) {
  return (
    <div>
      <AntEmpty
        style={{ position: 'absolute', top: '38%', left: '50%' }}
        imageStyle={{ height: 60 }}
        description={<span>Unable to fetch member list</span>}
      >
        <Button type='primary' onClick={props.tryAgain}>
          Try again
        </Button>
      </AntEmpty>
    </div>
  );
}
