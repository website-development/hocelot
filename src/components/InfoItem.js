import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ArrowBorderWrapper } from '../styles/common';
import useClickOutside from '../hooks/useClickOutside';

const Wrapper = styled.div`
  position: relative;
`;

const StyledArrowBorderWrapper = styled(ArrowBorderWrapper)`
  padding: 10px 20px;
  font-size: 2.2rem;
  color: ${props => props.theme.grey};
  cursor: pointer;
`;

const List = styled.ul`
  position: absolute;
  z-index: 2;
  top: 100%;
  width: 100%;
  margin: 0;
  padding: 20px 10px;
  list-style-type: none;
  border: ${props => props.theme.border};
  border-radius: 2px;
  font-size: 1.8rem;
  line-height: 1.5;
  background-color: ${props => props.theme.white};
`;

const Item = styled.div`
  text-transform: uppercase;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ItemLabel = styled.div`
  color: ${props => props.theme.grey};
`;

function InfoItem({ title, className, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);
  useClickOutside(dropDownRef, () => {
    setIsOpen(false);
  });

  return (
    <Wrapper ref={dropDownRef} className={className}>
      <StyledArrowBorderWrapper onClick={() => setIsOpen(true)}>
        {title}
      </StyledArrowBorderWrapper>
      {isOpen && (
        <List>
          {options.map(item => (
            <Item>
              <ItemLabel>{item.name}</ItemLabel>
              <div>{item.value}</div>
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

InfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default InfoItem;
