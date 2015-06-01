---
layout: post
title: Word Search
category: OJ
tags: Array Backtracking
---
##问题描述
Given a 2D board and a word, find if the word exists in the grid.
The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
For example,
Given board =

```
[
  ["ABCE"],
  ["SFCS"],
  ["ADEE"]
]
```

word = `"ABCCED"`, -> returns `true`,  
word = `"SEE"`, -> returns `true`,  
word = `"ABCB"`, -> returns `false`.

##解决方案
###DFS

我们可以将题目描述的搜索过程转化为在从一棵Tree的根节点开始，搜索以word字符串为顺序的路径。这样一来便可以采用深度优先搜索的思想来解决的这个问题。而如何将board转化为Tree是解决问题的关键。我们发现，每一次迭代之后有上下左右四个搜索方向，这相邻的4个节点（也可能小于4）便可看为父节点的四个子节点。将这个过程进行h次，构造出一棵高度为h的Tree。board中有多少个字符，便可以构造出多少棵这样的Tree。也就是说，题目转化为如何在这片Forest中找出一条以word字符串为顺序的路径。

DFS的伪代码如下：

```
procedure DFS(G,v)
	label v as discovered
	for all vertex m which is adjacent to v do
		if m is not discovered then
			recurively call DFS(G,m)
```

DFS只需要找出一个相同的节点，而题目需要的是找出一条相同的路径。因此，在DFS只需要保存每个点的状态，而在该题目中我们需要保存一条路径中所有的点的状态。这是需要对DFS进行改造的地方。

###复杂度

设board中有n个节点，word中有m个字符，则该算法的时间复杂度为`O(nm)`。

###代码

```c++
class Solution {
public:
	bool exist(vector<vector<char>>& board, string word) {
		this->board = board;
		this->word = word;
		for (int i = 0; i < board.size(); i++)
			flag.push_back(vector<bool>(board[i].size(), false));
		for (int row = 0; row < board.size(); row++)
			for (int col = 0; col < board[row].size(); col++)
				if (exist(row, col, 0))
					return true;

		return false;
	}
private:
	vector<vector<char>> board;
	vector<vector<bool>> flag;
	string word;
	bool exist(int row, int col, int k)
	{
		if (flag[row][col] || word[k] != board[row][col])
			return false;
		if (k == word.length() - 1)
			return true;
		flag[row][col] = true;
		if ((col > 0 && exist(row, col - 1, k + 1))
			|| (col + 1 < board[row].size() && exist(row, col + 1, k + 1))
			|| (row > 0 && col < board[row - 1].size() && exist(row - 1, col, k + 1))
			|| (row + 1 < board.size() && col < board[row + 1].size() && exist(row + 1, col, k + 1)))
		{
			flag[row][col] = false;
			return true;
		}
		flag[row][col] = false;
		return false;
	}
};
```
