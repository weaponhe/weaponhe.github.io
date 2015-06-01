---
layout: post
title: Word Search
category: OJ
tags: Array Backtracking
---
###问题描述
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

###解决方案一
-DFS

```
procedure DFS(G,v)
	label v as discovered
	for all vertex m which is adjacent to v do
		if m is not discovered then
			recurively call DFS(G,m)
```

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
