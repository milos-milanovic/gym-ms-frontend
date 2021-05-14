import React from 'react';

import { WarningTwoTone } from '@ant-design/icons';

export default function Announcements() {
  // temporary until announcements are implemented
  return (
    <div>
      <p style={{ height: '90vh', display: 'grid', placeItems: 'center', fontSize: '2em' }}>
        <span>
          <WarningTwoTone /> <u>Announcements</u> not implemented yet
        </span>
      </p>
    </div>
  );
}
