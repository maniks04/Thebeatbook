import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    console.log('mounted test');
  }


  render() {
    return (
      <div>
        Hey
      </div>
    );
  }
}

export default Test;

