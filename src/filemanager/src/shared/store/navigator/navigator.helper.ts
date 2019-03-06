import { NFMItem } from '../../models/item.model';
import { NFMHistory } from '../../models/history.model';
import { NFMUtil } from '../../util/util';

export class NavigatorHelper {
	public static buildTree(basePath: string[], fileList: NFMItem[], history: NFMHistory[], currentPath: string[])
	{
		if (!history.length) {
			history = [ { name: basePath[0] || '', nodes: [], item: undefined } ];
		}

		history = this.copy(history);

		const path = currentPath.join('/');
		const flatNodes = this.flatten(history[0]);
		const selectedNode = flatNodes.find(n => n.name === path);
		if (selectedNode) {
			selectedNode.nodes = [];
		}

		for (const item of fileList) {
			if (NFMUtil.isFolder(item)) {
				this.recursive(history[0], item, path);
			}
		}

		return history;
	}

	private static recursive(parent: NFMHistory, item: NFMItem, path: string) {
		const absName = path ? (path + '/' + item.name) : item.name;
		if (parent.name && parent.name.trim() && path.trim().indexOf(parent.name) !== 0) {
			parent.nodes = [];
		}

		if (parent.name !== path) {
			parent.nodes.forEach(n => this.recursive(n, item, path));
		} else {
			for (const n of parent.nodes) {
				if (n.name === absName) {
					return;
				}
			}

			parent.nodes = [
				...parent.nodes,
				{ item: item, name: absName, nodes: [] }
			];
		}

		parent.nodes = parent.nodes.sort((a, b) =>
			a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() === b.name.toLowerCase() ? 0 : 1
		);
	}

	private static flatten(node: NFMHistory) {
		const nodes = [ node ];
		for (const n of node.nodes) {
			nodes.push.apply(nodes, this.flatten(n));
		}

		return nodes;
	}

	private static copy(history: NFMHistory[]) {
		const map = (h: NFMHistory) => {
			const nodes = this.copy(h.nodes);
			return { ...h, nodes };
		};

		return history.map(map);
	}
}
