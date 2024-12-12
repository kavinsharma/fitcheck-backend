exports.search = (filter, sort, pagination) => {
  const baseQuery = [
    {
      $match: {
        ...filter,
      },
    },
  ];

  const dataQuery = [
    ...baseQuery,
    sort,
    {
      $skip: pagination?.skip,
    },
    {
      $limit: pagination?.limit,
    },
  ];

  const countQuery = [
    ...baseQuery,
    {
      $count: "count",
    },
  ];

  return [
    {
      $facet: {
        data: dataQuery,
        count: countQuery,
      },
    },
  ];
};
