import React from 'react';

interface Statement {
  id: string;
  psid: string;
  title: string;
  objective: string;
  background: string;
  industry: string;
  logo: string;
  sdgGoals: string[];
}

interface StatementTableProps {
  title: string;
  statements: Statement[];
}

const StatementTable: React.FC<StatementTableProps> = ({
  title,
  statements,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
      <h2 className="text-xl font-semibold mb-4 p-4 bg-gray-100 border-b border-gray-200 text-black">
        {title}
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[5%]">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[10%]">
              PSID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[15%]">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[20%]">
              Objective
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[20%]">
              Background
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[10%]">
              Industry
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[10%]">
              Logo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-[15%]">
              SDG Goals
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {statements.map((statement) => (
            <tr key={statement.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                {statement.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                {statement.psid}
              </td>
              <td className="px-4 py-4 text-sm text-black break-words">
                {statement.title}
              </td>
              <td className="px-4 py-4 text-sm text-black break-words">
                {statement.objective}
              </td>
              <td className="px-4 py-4 text-sm text-black break-words">
                {statement.background}
              </td>
              <td className="px-4 py-4 text-sm text-black">
                {statement.industry}
              </td>
              <td className="px-4 py-4 text-sm text-black">
                <img
                  src={statement.logo}
                  alt={statement.title}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="px-4 py-4 text-sm text-black break-words flex gap-3 justify-center items-center mt-10">
                <img
                  src={`/sdgs/${statement.sdgGoals[0]}.svg`}
                  alt={statement.sdgGoals[0]}
                  className="w-10 h-10 object-cover"
                ></img>
                <img
                  src={`/sdgs/${statement.sdgGoals[1]}.svg`}
                  alt={statement.sdgGoals[0]}
                  className="w-10 h-10 object-cover"
                ></img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatementTable;
