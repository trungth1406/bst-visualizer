import { expect } from "chai";
import { BasicBinarySearchTree } from "../src/bst";


describe('create new bst tree with api', () => {
    let tree = BasicBinarySearchTree<Number, String>().newInstance();

    it('insert root node', () => {
        tree.insert(12, "First");
        expect(tree.getRoot()).not.null;
        expect(tree.getRoot()?.key).equal(12);
    });

    it('insert child node for root', () => {
        tree.insert(10, "Second");
        tree.insert(13, "Third");
        expect(tree.getRoot()?.left).not.null;
        expect(tree.getRoot()?.right).not.null;
        expect(tree.getRoot()?.left?.key).equal(10);
        expect(tree.getRoot()?.right?.key).equal(13);
    });
    it('update root node value', () => {
        tree.insert(12, "Changed");
        expect(tree.getRoot()?.left).not.null;
        expect(tree.getRoot()?.right).not.null;
        expect(tree.getRoot()?.value).equal("Changed");
    });

    it('creates new instance of tree', () => {
        let otherTree = BasicBinarySearchTree().newInstance();
        expect(otherTree.getRoot()).is.null;
    });

    it('delete a node from tree', () => {
        tree.deleteNode(12);
        expect(tree.getRoot()?.left).not.null;
        expect(tree.getRoot()?.left?.key).eq(10);
        expect(tree.getRoot()?.right).is.null;
    });
    
    it('delete a node from tree second case', () => {
        let otherTree = BasicBinarySearchTree().newInstance();
        otherTree.insert(12, "");
        otherTree.insert(10, "");
        otherTree.insert(17, "");
        otherTree.insert(15, "");
        otherTree.insert(16, "");
        otherTree.deleteNode(12);
        expect(tree.getRoot()?.left).not.null;
        expect(tree.getRoot()?.left?.key).eq(10);
        expect(tree.getRoot()?.right).is.null;
    });
});