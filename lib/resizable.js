// new Resizable(div, {
//     resizestart: function() {},
//     resizing: function() {},
//     resizeend: function() {},
//     anchors: ['right', 'bottom', 'right-bottom'],
//     minHeight: 100,
//     maxWidth: 200,
// });


class Resizable {
    axisMap = {
        'left': 'horizontal',
        'right': 'horizontal',
        'top': 'vertical',
        'bottom': 'vertical',
        'left-top': '',
        'left-bottom': '',
        'right-top': '',
        'right-bottom': '',
    };
    anchorWidth = 20;
    constructor(el, options) {
        this.rootEl = el;
        this.isResizing = false;
        this.rootEl.style.position = 'relative';
        this.anchors = options.anchors || ['right', 'bottom'];
        this.resizestart = options.resizestart || function() {};
        this.resizing = options.resizing || function() {};
        this.resizeend = options.resizeend || function() {};

        // px相关
        this.minWidth = options.minWidth;
        this.maxWidth = options.maxWidth;
        this.minHeight = options.minHeight;
        this.maxHeight = options.maxHeight;

        // 栅格化相关
        this.isGrid = !!options.flexRootEl;
        this.grid = options.grid || 6;
        this.flexRootEl = options.flexRootEl;
        this.col = options.col || {};
        this.row = options.row || {};
        this.gridGap = options.gap || 0;
        this.baseCol = 100;
        this.baseHeight = 100;

        this.createAnchors();
    }
    createAnchors() {
        let nodes = this.anchors.map(anchor => {
            let node = this.bindEvent(this.createAnchor(anchor), anchor);
            return node;
        });
        this.rootEl.append(...nodes);
    }
    createAnchor(anchor) {
        let pos = document.createElement('div');
        pos.style.position = 'absolute';
        switch(anchor) {
            case 'top' : {
                pos.className = 'pos top';
                pos.style.width = '100%';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.top = '0';
                pos.style.left = '0';
                pos.style.cursor = 'n-resize';
                break;
            };
            case 'bottom' : {
                pos.className = 'pos botttom';
                pos.style.width = '100%';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.bottom = '0';
                pos.style.left = '0';
                pos.style.cursor = 's-resize';
                break;
            };
            case 'left' : {
                pos.className = 'pos left';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = '100%';
                pos.style.top = '0';
                pos.style.left = '0';
                pos.style.cursor = 'w-resize';
                break;
            };
            case 'right' : {
                pos.className = 'pos right';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = '100%';
                pos.style.top = '0';
                pos.style.right = '0';
                pos.style.cursor = 'e-resize';
                break;
            }
            case 'left-top': {
                pos.className = 'pos left-top';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.left = '0';
                pos.style.top = '0';
                pos.style.zIndex = '1';
                pos.style.cursor = 'nw-resize';
                break;
            }
            case 'left-bottom': {
                pos.className = 'pos left-bottom';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.left = '0';
                pos.style.bottom = '0';
                pos.style.zIndex = '1';
                pos.style.cursor = 'sw-resize';
                break;
            }
            case 'right-top': {
                pos.className = 'pos right-top';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.right = '0';
                pos.style.top = '0';
                pos.style.zIndex = '1';
                pos.style.cursor = 'ne-resize';
                break;
            }
            case 'right-bottom': {
                pos.className = 'pos right-bottom';
                pos.style.width = this.anchorWidth + 'px';
                pos.style.height = this.anchorWidth + 'px';
                pos.style.right = '0';
                pos.style.bottom = '0';
                pos.style.zIndex = '1';
                pos.style.cursor = 'se-resize';
                break;
            }
            default: {}
        }
        return pos;
    }
    handleResizeStart(evt, anchor) {
        let rect = this.rootEl.getBoundingClientRect();
        this.rootRect = rect;
        
        this.startX = evt.pageX;
        this.startY = evt.pageY;
        this.startWidth = rect.width;
        this.startHeight = rect.height;

        if(this.isGrid) {
            this.setGrid();
        }

        this.isResizing = true;

        this.resizestart(anchor, {
            width: rect.width,
            height: rect.height,
        });
    }
    handleResizing(evt, anchor) {
        let offset = this.getOffsetFromEvent(evt, anchor);
        let {
            w: width,
            h: height
        } = this.adjustRect(offset);
        this.rootEl.style.width = width + 'px';
        this.rootEl.style.height = height + 'px';
        this.resizing({
            ...offset,
            w: width,
            h: height
        });
    }
    handleResizeEnd(evt, anchor) {
        this.isResizing = false;
        let offset = this.getOffsetFromEvent(evt, anchor);
        let rect = this.adjustRect(offset);
        let resizedRect = this.adjustGrid(rect);
        // this.rootEl.style.width = resizedRect.w + 'px';
        // this.rootEl.style.height = resizedRect.h + 'px';
        this.rootEl.className = this.rootEl.className.replace(/col-\d/, 'col-' + resizedRect.col);
        this.rootEl.style.width = null;
        this.rootEl.style.height = resizedRect.h + 'px';
        this.resizeend(resizedRect);
    }
    setGrid() {
        let flexRect = this.flexRootEl.getBoundingClientRect();
        this.flexRootRect = flexRect;
        this.baseCol = Math.floor((this.flexRootRect.width - this.gridGap * (this.grid - 1)) / this.grid);
        this.col.min ? (this.minWidth = this.getColWidth(this.col.min)) : null;
        this.col.max ? (this.maxWidth = this.getColWidth(this.col.max)) : null;
        this.row.min ? (this.minHeight = this.getRowWidth(this.row.min)) : null;
        this.row.max ? (this.maxHeight = this.getRowWidth(this.row.max)) : null;

    }
    bindEvent(node, anchor) {
        let that = this;
        function move(e) {
            that.handleResizing(e, anchor);
        }
        function end (e) {
            document.body.removeEventListener('mousemove', move);
            if(that.isResizing) {
                that.handleResizeEnd(e, anchor);
            }
            document.body.removeEventListener('mouseup', end);
        }
        // resize start
        node.addEventListener('mousedown', function(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            evt.stopPropagation();

            that.handleResizeStart(evt, anchor);
            document.body.addEventListener('mousemove', move);

            document.body.addEventListener('mouseup', end);

        });

        return node;
    }
    getOffsetFromEvent(e, anchor) {
        return this.getOffset(this.startX, this.startY, e.pageX, e.pageY, anchor);
    }
    getOffset(startX, startY, nowX, nowY, anchor) {
        let offset = { x: 0, y: 0 };
        let axis = this.axisMap[anchor];
        if(axis !== 'horizontal') {
            offset.y = nowY - startY;
            if(anchor.indexOf('top') > -1) {
                offset.y = startY - nowY;
            }
        }
        if(axis !== 'vertical') {
            offset.x = nowX - startX;
            if(anchor.indexOf('left') > -1) {
                offset.x = startX - nowX;
            }
        }
        return offset;
    }
    getColWidth(colNum) {
        return this.baseCol * colNum + this.gridGap * (colNum - 1);
    }
    getRowWidth(rowNum) {
        return this.baseHeight * rowNum + this.gridGap * (rowNum - 1);
    }
    /**
     * 根据offset调整宽高
     * @param {*} offset 
     * @returns { x, y, w, h }
     */
    adjustRect(offset) {
        let w = this.startWidth + offset.x;
        let h = this.startHeight + offset.y;
        if(this.maxWidth && w > this.maxWidth) {
            w = this.maxWidth;
        } else if(this.minWidth && w < this.minWidth) {
            w = this.minWidth;
        }
        if(this.maxHeight && h > this.maxHeight) {
            h = this.maxHeight;
        } else if(this.minHeight && h < this.minHeight) {
            h = this.minHeight;
        }
        return {
            ...offset,
            w,
            h
        };
    }
    getCol(width) {
        let n = 1;
        let max = this.baseCol;
        while(max < width) {
            max += (this.baseCol + this.gridGap);
            n++;
        }
        if((max - this.baseCol / 2) > width ) {
            return n - 1;
        } else {
            return n;
        }
    }
    getRow(height) {
        let n = 1;
        let max = this.baseHeight;
        while(max < height) {
            max += this.baseHeight + this.gridGap;
            n++;
        }
        if((max - this.baseHeight / 2) > height ) {
            return n - 1;
        } else {
            return n;
        }
    }
    /**
     * 
     * @param {x, y, w, h} rect 
     * @returns { x, y, w, h, col, row }
     */
    adjustGrid(rect) {
        let col = this.getCol(rect.w);
        let row = this.getRow(rect.h);
        return {
            ...rect,
            col,
            row,
            w: this.getColWidth(col),
            h: this.getRowWidth(row),
        }
    }
}
