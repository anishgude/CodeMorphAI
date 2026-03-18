class Cart:
    def __init__(self, items=None):
        self.items = items or []

    def add(self, item):
        self.items.append(item)
        return len(self.items)
