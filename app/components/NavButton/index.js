import styled from 'styled-components';

export default styled.span`
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  &:not(.active):hover {
    color: #555;
  }
  &.active {
    cursor: auto;
    color: #5CB85C;
    border-bottom: solid 2px #5CB85C;
  }
`;
