import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query?.search as string;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'page', 'limit'];
    excludeFields.forEach(element => delete queryObj[element]);

    // Special mapping for `filter`
    if (queryObj.filter) {
      queryObj.author = queryObj.filter;
      delete queryObj.filter;
    }

    // Advanced filters (e.g., gte, lte, in)
    Object.keys(queryObj).forEach(key => {
      if (typeof queryObj[key] === 'string' && queryObj[key]?.includes(',')) {
        queryObj[key] = { $in: queryObj[key].split(',') };
      }
    });

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sortBy() {
    const sortField = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder === 'desc' ? '' : '-';
    const sort = sortField ? `${sortOrder}${sortField}` : '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
