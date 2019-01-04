/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const pickClassName = prop('className');

const styles = theme => ({
  panel: {
    width: '100%',
    paddingRight: 0,
    paddingLeft: 0,
  },
  panelSummary: {
    padding: 0,
    marginLeft: theme.spacing.unit,
  },
  panelDetails: {
    padding: 0,
    display: 'block',
  },
  panelExpanded: {
    margin: 0,
    '&:before': {
      opacity: 0,
    },
  },
  childPanel: {
    '&:before': {
      opacity: 0,
    },
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
    maxWidth: '75vw',
  },
  expandIcon: {},
});

const tree = {
  // The node value.
  value: PropTypes.string.isRequired,
  // Optional node ID. Useful for when the node value is not unique.
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Object.assign(tree, {
  nodes: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(tree), PropTypes.string]),
  ),
});

class TreeView extends Component {
  createFilteredTree = (t, searchTerm) => (searchTerm ? this.filter(t) : t);

  handleLeafClick = leaf => {
    if (this.props.onLeafClick) {
      this.props.onLeafClick(leaf);
    }
  };

  renderNode = (node, parent, depth = 0) => {
    const {
      theme: {
        spacing: { unit },
      },
      classes,
      searchTerm,
      onLeafClick: _,
      expansionPanelSummaryProps,
      expansionPanelDetailsProps,
      listItemProps,
      ...props
    } = this.props;
    const value = this.getNodeValue(node);
    const id = this.getNodeId(node);
    const isLeaf = this.isLeaf(node);
    const textIndent = isLeaf
      ? depth * unit + unit + (parent ? unit : 0)
      : unit * depth + unit;

    if (isLeaf && searchTerm && !value.includes(searchTerm)) {
      return null;
    }

    if (isLeaf) {
      return (
        <ListItem
          disableGutters
          style={{ textIndent }}
          key={typeof id !== 'undefined' ? id : value}
          id={value}
          value={value}
          onClick={() => this.handleLeafClick({ value, parent, id })}
          button
          {...listItemProps}
        >
          <div className={classes.text}>{value}</div>
        </ListItem>
      );
    }

    const expansionPanelClasses = {
      expanded: classes.panelExpanded,
      ...(parent ? { root: classes.childPanel } : null),
    };

    return (
      <ExpansionPanel
        classes={expansionPanelClasses}
        style={{ textIndent }}
        key={typeof node.id !== 'undefined' ? node.id : node.value}
        elevation={0}
        {...props}
        className={classNames(classes.panel, pickClassName(props))}
      >
        <ExpansionPanelSummary
          classes={{
            expandIcon: classes.expandIcon,
            root: classes.panelSummary,
          }}
          {...expansionPanelSummaryProps}
          className={classNames(pickClassName(expansionPanelSummaryProps))}
          expandIcon={<KeyboardArrowDown />}
        >
          <div className={classes.text}>{node.value}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          {...expansionPanelDetailsProps}
          classes={{ root: classes.panelDetails }}
          className={classNames(pickClassName(expansionPanelDetailsProps))}
        >
          {node.nodes.map(l => this.renderNode(l, node, depth + 1))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  isLeaf(node) {
    return typeof node === 'string' || !node.nodes || !node.nodes.length;
  }

  getNodeValue(node) {
    return typeof node === 'string' ? node : node.value;
  }

  getNodeId(node) {
    if (typeof node === 'object') {
      return node.id;
    }
    return null;
  }

  filter(t) {
    const { searchTerm } = this.props;

    return t.filter(node => {
      const value = this.getNodeValue(node);
      const isLeaf = this.isLeaf(node);

      if (value.includes(searchTerm)) {
        return true;
      }

      if (isLeaf) {
        return false;
      }

      const subtree = this.filter(node.nodes);

      return Boolean(subtree.length);
    });
  }

  render() {
    const t = this.createFilteredTree(this.props.tree, this.props.searchTerm);

    return t.map(node => this.renderNode(node, null));
  }
}

TreeView.propTypes = {
  /** The data to render as a tree view */
  tree: PropTypes.arrayOf(PropTypes.shape(tree)).isRequired,
  /** Callback function fired when a tree leaf is clicked. */
  onLeafClick: PropTypes.func,
  /** A search term to refine the tree */
  searchTerm: PropTypes.string,
  /** Properties applied to the ExpansionPanelSummary element. */
  expansionPanelSummaryProps: PropTypes.object,
  /** Properties applied to the ExpansionPanelDetails element. */
  expansionPanelDetailsProps: PropTypes.object,
  /** Properties applied to the ListItem element. */
  listItemProps: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(TreeView);
